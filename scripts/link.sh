#!/usr/bin/env bash

CHECK="\e[32m🗸\e[0m"
ROMCAL_PATH="../${ROMCAL_ALIAS:-'romcal'}"
BUNDLE_ROOT="${ROMCAL_PATH}/dist/bundles"
LOCALES=

buildLocales () {
  local relative_dirs=($BUNDLE_ROOT/*)
  local directories=()
  for dir in "${relative_dirs[@]}"; do
    directories+=("${dir##*/}")
  done
  LOCALES=("${directories[@]}")
}

linkBundle () {
  if [ -z "${1}" ]; then
    echo -e "\e[31mNo bundles!\e[0m"
    exit 1
  fi
  bundles=()
  for bundle in "${@}"; do
    bundles+=("$BUNDLE_ROOT/$bundle")
  done

  echo -n "linking bundles..." && \
    npm -s --no-progress link "${bundles[@]}" && \
    echo -e " ${CHECK}" || \
    echo -e "\e[31mLinking bundles failed!\e[0m"
}

linkRomcal () {
  echo -n "linking romcal..." && \
  npm -s --no-progress link "$ROMCAL_PATH" && \
  echo -e " ${CHECK}" || \
  echo -e "\e[31mLinking romcal failed!\e[0m"
}

link () {
  local locales=();
  echo -e "linking... \e[36m${1}\e[0m"
  if [ -z "${1}" ]; then
    # if first param (bundles) is empty, default to general-roman
    locales=("general-roman");
  elif [[ "${1}" == "all" ]]; then
    # if the first param (bundles) is "all", set locales to all
    locales=("${LOCALES[@]}")
  elif [[ -n "${1}" ]]; then
    split_param=$(echo "${1}" | tr ",")
    # if it's populated... check it?
    for provided in "${split_param[@]}"; do
      for dir in "${locales[@]}"; do
        if [[ "${dir}" == "${provided}"  ]]; then
          locales+=("${provided}")
        fi
      done
    done
  fi

  ## now actually link
  linkBundle "${locales[@]}"
  linkRomcal
  echo -e "dev files linked ${CHECK}"
  exit 0
}

buildLocales
link "$@"