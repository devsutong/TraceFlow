#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

# This is a collection of bash functions used by different scripts

# imports
. scripts/utils.sh

export CORE_PEER_TLS_ENABLED=true
export ORDERER1_CA=${PWD}/organizations/ordererOrganizations/traceflow.org/orderer1/tlsca/tlsca-cert.pem
export ORDERER2_CA=${PWD}/organizations/ordererOrganizations/traceflow.org/orderer2/tlsca/tlsca-cert.pem
export PEER0_PRODUCERS_CA=${PWD}/organizations/peerOrganizations/producers/tlsca/tlsca.producers-cert.pem
export PEER0_DISTRIBUTORS_CA=${PWD}/organizations/peerOrganizations/distributors/tlsca/tlsca.distributors-cert.pem
export PEER0_RETAILERS_CA=${PWD}/organizations/peerOrganizations/retailers/tlsca/tlsca.retailers-cert.pem
export PEER0_CUSTOMERS_CA=${PWD}/organizations/peerOrganizations/customers/tlsca/tlsca.customers-cert.pem
export PEER0_SUPPLIERS_CA=${PWD}/organizations/peerOrganizations/suppliers/tlsca/tlsca.suppliers-cert.pem

# Set environment variables for the peer org
setGlobals() {
  PEER=$1
  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$2
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
  infoln "Using organization ${USING_ORG}"
  if [ "$USING_ORG" == "producers" ]; then
    export CORE_PEER_LOCALMSPID="ProducersMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_PRODUCERS_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/producers/users/Admin@producers/msp
    if [ $PEER -eq 0 ]; then
      export CORE_PEER_ADDRESS=localhost:4444
    elif [ $PEER -eq 1 ]; then
      export CORE_PEER_ADDRESS=localhost:4454
    elif [ $PEER -eq 2 ]; then
      export CORE_PEER_ADDRESS=localhost:4464
    elif [ $PEER -eq 3 ]; then
      export CORE_PEER_ADDRESS=localhost:4474
    elif [ $PEER -eq 4 ]; then
      export CORE_PEER_ADDRESS=localhost:4484
    fi
  elif [ "$USING_ORG" == "distributors" ]; then
    export CORE_PEER_LOCALMSPID="DistributorsMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_DISTRIBUTORS_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/distributors/users/Admin@distributors/msp
    if [ $PEER -eq 0 ]; then
      export CORE_PEER_ADDRESS=localhost:5555
    elif [ $PEER -eq 1 ]; then
      export CORE_PEER_ADDRESS=localhost:5565
    elif [ $PEER -eq 2 ]; then
      export CORE_PEER_ADDRESS=localhost:5575
    elif [ $PEER -eq 3 ]; then
      export CORE_PEER_ADDRESS=localhost:5585
    elif [ $PEER -eq 4 ]; then
      export CORE_PEER_ADDRESS=localhost:5595
    fi
  elif [ "$USING_ORG" == "retailers" ]; then
    export CORE_PEER_LOCALMSPID="RetailersMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_RETAILERS_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/retailers/users/Admin@retailers/msp
    if [ $PEER -eq 0 ]; then
      export CORE_PEER_ADDRESS=localhost:6666
    elif [ $PEER -eq 1 ]; then
      export CORE_PEER_ADDRESS=localhost:6676
    elif [ $PEER -eq 2 ]; then
      export CORE_PEER_ADDRESS=localhost:6686
    elif [ $PEER -eq 3 ]; then
      export CORE_PEER_ADDRESS=localhost:6696
    elif [ $PEER -eq 4 ]; then
      export CORE_PEER_ADDRESS=localhost:6706
    fi
  elif [ "$USING_ORG" == "customers" ]; then
    export CORE_PEER_LOCALMSPID="CustomersMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_CUSTOMERS_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/customers/users/Admin@customers/msp
    if [ $PEER -eq 0 ]; then
      export CORE_PEER_ADDRESS=localhost:7777
    elif [ $PEER -eq 1 ]; then
      export CORE_PEER_ADDRESS=localhost:7787
    elif [ $PEER -eq 2 ]; then
      export CORE_PEER_ADDRESS=localhost:7797
    elif [ $PEER -eq 3 ]; then
      export CORE_PEER_ADDRESS=localhost:7807
    elif [ $PEER -eq 4 ]; then
      export CORE_PEER_ADDRESS=localhost:7817
    fi
  elif [ "$USING_ORG" == "suppliers" ]; then
    export CORE_PEER_LOCALMSPID="SuppliersMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_SUPPLIERS_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/suppliers/users/Admin@suppliers/msp
    if [ $PEER -eq 0 ]; then
      export CORE_PEER_ADDRESS=localhost:8888
    elif [ $PEER -eq 1 ]; then
      export CORE_PEER_ADDRESS=localhost:8898
    elif [ $PEER -eq 2 ]; then
      export CORE_PEER_ADDRESS=localhost:8908
    elif [ $PEER -eq 3 ]; then
      export CORE_PEER_ADDRESS=localhost:8918
    elif [ $PEER -eq 4 ]; then
      export CORE_PEER_ADDRESS=localhost:8928
    fi

  else
    errorln "ORG Unknown"
  fi

  if [ "$VERBOSE" == "true" ]; then
    env | grep CORE
  fi
}

# Set environment variables for use in the CLI container 
setGlobalsCLI() {
  setGlobals 0 $1

  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
  if [ "$USING_ORG" == "producers" ]; then
    export CORE_PEER_ADDRESS=peer0.producers:4444
  elif [ "$USING_ORG" == "distributors" ]; then
    export CORE_PEER_ADDRESS=peer0.distributors:5555
  elif [ "$USING_ORG" == "retailers" ]; then
    export CORE_PEER_ADDRESS=peer0.retailers:6666
  elif [ "$USING_ORG" == "customers" ]; then
    export CORE_PEER_ADDRESS=peer0.customers:7777
  elif [ "$USING_ORG" == "suppliers" ]; then
    export CORE_PEER_ADDRESS=peer0.suppliers:8888

  else
    errorln "ORG Unknown"
  fi
}

# parsePeerConnectionParameters $@
# Helper function that sets the peer connection parameters for a chaincode
# operation
parsePeerConnectionParameters() {
  PEER_CONN_PARMS=()
  PEERS=""

  # Loop through the input parameters as an array of strings
  for PARAM in "$@"; do
    setGlobals 0 "$PARAM"
    PEER="peer0.$PARAM"
    ## Set peer addresses
    if [ -z "$PEERS" ]; then
      PEERS="$PEER"
    else
      PEERS="$PEERS $PEER"
    fi

    PEER_CONN_PARMS=("${PEER_CONN_PARMS[@]}" --peerAddresses $CORE_PEER_ADDRESS)

    ## Set path to TLS certificate
    CA="PEER0_${PARAM^^}"_CA
    TLSINFO=(--tlsRootCertFiles "${!CA}")
    PEER_CONN_PARMS=("${PEER_CONN_PARMS[@]}" "${TLSINFO[@]}")
  done

  # Remove leading space for output
  PEERS="$(echo -e "$PEERS" | sed -e 's/^[[:space:]]*//')"
}

verifyResult() {
  if [ $1 -ne 0 ]; then
    fatalln "$2"
  fi
}

