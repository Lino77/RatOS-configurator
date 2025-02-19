#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )
# shellcheck source=./configuration/scripts/moonraker-ensure-policykit-rules.sh
source "$SCRIPT_DIR"/moonraker-ensure-policykit-rules.sh
ensure_moonraker_policiykit_rules

# shellcheck source=./configuration/scripts/ratos-common.sh
source "$SCRIPT_DIR"/ratos-common.sh
ensure_service_permission

echo "##### Symlinking registered extensions"
ratos extensions symlink klipper
