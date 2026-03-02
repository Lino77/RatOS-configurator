#!/usr/bin/env bash

# 1. Root Check
if [ "$EUID" -ne 0 ]; then
    echo "This script must be run as root (sudo)."
    exit 1
fi

SSID="$1"
PASSWORD="$2"
COUNTRY="$3"
HIDDEN="$5"

if [[ -z "$SSID" || -z "$PASSWORD" ]]; then
    echo "Usage: $0 <SSID> <Password> <Country> <Frequency> <hidden|visible>"
    exit 1
fi

# 2. Set Country Code
if [ -n "$COUNTRY" ]; then
    # Using iw reg set is more reliable for RatOS/NetworkManager
    iw reg set "$COUNTRY"
    # Make it permanent (Debian/Ubuntu way)
    sed -i "s/REGDOMAIN=.*/REGDOMAIN=$COUNTRY/" /etc/default/crda 2>/dev/null || true
fi

# 3. Completely remove old connections with the same SSID
# We delete all profiles using the same SSID to avoid conflicts
mapfile -t OLD_CONNS < <(nmcli -g NAME,TYPE connection show | grep "802-11-wireless" | cut -d: -f1)
for conn in "${OLD_CONNS[@]}"; do
    if [[ "$conn" == "$SSID" ]]; then
        nmcli connection delete "$conn" >/dev/null 2>&1
    fi
done

# 4. Create permanent connection
# -- wifi.cloned-mac-address preserve helps with stable connections
nmcli connection add \
    type wifi \
    ifname wlan0 \
    con-name "$SSID" \
    ssid "$SSID" \
    autoconnect yes \
    mode infrastructure \
    -- \
    wifi-sec.key-mgmt wpa-psk \
    wifi-sec.psk "$PASSWORD" \
    wifi-sec.psk-flags 0 \
    ipv4.method auto \
    ipv6.method auto

# If the network is hidden
if [ "$HIDDEN" = "hidden" ]; then
    nmcli connection modify "$SSID" 802-11-wireless.hidden yes
fi

# 5. Prioritize and save connection
nmcli connection modify "$SSID" connection.autoconnect-priority 100
nmcli connection up "$SSID"

# 6. BTT-CB1 Support (kept for backward compatibility)
#function get_sbc {
#    if [ -f /etc/board-release ]; then
#        grep BOARD_NAME /etc/board-release | cut -d '=' -f2 | tr -d '"'
#    fi
#}

#if [[ $(get_sbc) == "BTT-CB1" ]]; then
#  cat << __EOF > /boot/system.cfg
# Supplied by RatOS Configurator for CB1
#WIFI_SSID="$1"
#WIFI_PASSWD="$2"
#WIFI_AP="false"
#__EOF
#fi

echo "WiFi configuration for $SSID has been successfully saved and applied."
