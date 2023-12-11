#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
GIT_DIR=$SCRIPT_DIR/../.git
if echo "$SCRIPT_DIR" | grep "/src/" > /dev/null; then
	# in the deployment branch src is the root. In main src is a subdirectory.
	GIT_DIR=$SCRIPT_DIR/../../.git
fi
SRC_DIR=$(realpath "$SCRIPT_DIR/..")
GIT_DIR=$(realpath "$GIT_DIR")

report_status()
{
    echo -e "\n\n###### $1"
}

pnpm_install() {
    pushd "$SRC_DIR" || exit 1
    pnpm install
    popd || exit 1
}

ensure_pnpm_installation() {
	if ! which pnpm &> /dev/null; then
		report_status "Installing pnpm"
		npm install -g pnpm
		# remove old node modules
		rm -rf "$SRC_DIR/node_modules"
		pnpm_install
	fi
}

ensure_service_permission()
{
	report_status "Updating service permissions"
	if ! cat /home/pi/printer_data/moonraker.asvc | grep "ratos-configurator" &>/dev/null; then
		printf '\nratos-configurator' >> /home/pi/printer_data/moonraker.asvc
		report_status "Configurator added to moonraker service permissions"
	fi
}

build() {
    pushd "$SCRIPT_DIR/.." || exit 1
	pnpm build
	popd || exit 1
}

install_hooks()
{
    report_status "Installing git hooks"
	if [ ! -L "$GIT_DIR/hooks/post-merge" ]; then
 	   ln -s "$SCRIPT_DIR/post-merge.sh" "$GIT_DIR/hooks/post-merge"
	fi
}

verify_users()
{
	if ! id "pi" &>/dev/null; then
		echo "User pi is not present on the system"
		exit 1
	fi
}

ensure_sudo_command_whitelisting()
{
	sudo="sudo"
	if [ "$1" = "root" ]
	then
		sudo=""
	fi
    report_status "Updating whitelisted commands"
	# Whitelist RatOS configurator git hook scripts
	if [[ -e /etc/sudoers.d/030-ratos-configurator-githooks ]]
	then
		$sudo rm /etc/sudoers.d/030-ratos-configurator-githooks
	fi
	touch /tmp/030-ratos-configurator-githooks
	cat << __EOF > /tmp/030-ratos-configurator-githooks
pi  ALL=(ALL) NOPASSWD: $SCRIPT_DIR/update.sh
__EOF

	$sudo chown root:root /tmp/030-ratos-configurator-githooks
	$sudo chmod 440 /tmp/030-ratos-configurator-githooks
	$sudo cp --preserve=mode /tmp/030-ratos-configurator-githooks /etc/sudoers.d/030-ratos-configurator-githooks

	# Whitelist configurator scripts
	if [[ -e /etc/sudoers.d/030-ratos-configurator-scripts ]]
	then
		$sudo rm /etc/sudoers.d/030-ratos-configurator-scripts
	fi
	touch /tmp/030-ratos-configurator-scripts
	cat << __EOF > /tmp/031-ratos-configurator-scripts
pi  ALL=(ALL) NOPASSWD: $SCRIPT_DIR/add-wifi-network.sh
pi  ALL=(ALL) NOPASSWD: $SCRIPT_DIR/change-hostname.sh
pi  ALL=(ALL) NOPASSWD: $SCRIPT_DIR/dfu-flash.sh
pi  ALL=(ALL) NOPASSWD: $SCRIPT_DIR/board-script.sh
__EOF

	$sudo chown root:root /tmp/031-ratos-configurator-scripts
	$sudo chmod 440 /tmp/031-ratos-configurator-scripts
	$sudo cp --preserve=mode /tmp/031-ratos-configurator-scripts /etc/sudoers.d/031-ratos-configurator-scripts

	# Whitelist configurator commands
	if [[ -e /etc/sudoers.d/031-ratos-configurator-wifi ]]
	then
		$sudo rm /etc/sudoers.d/031-ratos-configurator-wifi
	fi
	touch /tmp/031-ratos-configurator-wifi
	cat << __EOF > /tmp/031-ratos-configurator-wifi
pi  ALL=(ALL) NOPASSWD: /usr/sbin/iw
pi  ALL=(ALL) NOPASSWD: /usr/sbin/wpa_cli
__EOF

	$sudo chown root:root /tmp/031-ratos-configurator-wifi
	$sudo chmod 440 /tmp/031-ratos-configurator-wifi
	$sudo cp --preserve=mode /tmp/031-ratos-configurator-wifi /etc/sudoers.d/031-ratos-configurator-wifi

}
