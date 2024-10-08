#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $7)
    local CP=$(one_line_pem $8)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${PEER}/$2/" \
        -e "s/\${P0PORT}/$3/" \
        -e "s/\${P1PORT}/$4/" \
        -e "s/\${P2PORT}/$5/" \
        -e "s/\${CAPORT}/$6/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.json
}

function yaml_ccp {
    local PP=$(one_line_pem $7)
    local CP=$(one_line_pem $8)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${PEER}/$2/" \
        -e "s/\${P0PORT}/$3/" \
        -e "s/\${P1PORT}/$4/" \
        -e "s/\${P2PORT}/$5/" \
        -e "s/\${CAPORT}/$6/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.yaml | sed -e $'s/\\\\n/\\\n          /g'
}

## prepare connection profile for orgproducers
ORG=Producers
PEER=producers
P0PORT=4444
P1PORT=4454
P2PORT=4464
CAPORT=4400
PEERPEM=organizations/peerOrganizations/producers/tlsca/tlsca.producers-cert.pem
CAPEM=organizations/peerOrganizations/producers/ca/ca.producers-cert.pem

echo "$(json_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/producers/connection-producers.json
echo "$(yaml_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/producers/connection-producers.yaml
# save another copy of json connection profile in a different directory
echo "$(json_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > network-config/network-config-producers.json

## prepare connection profile for orgdistributors
ORG=Distributors
PEER=distributors
P0PORT=5555
P1PORT=5565
P2PORT=5575
CAPORT=5500
PEERPEM=organizations/peerOrganizations/distributors/tlsca/tlsca.distributors-cert.pem
CAPEM=organizations/peerOrganizations/distributors/ca/ca.distributors-cert.pem

echo "$(json_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/distributors/connection-distributors.json
echo "$(yaml_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/distributors/connection-distributors.yaml
# save another copy of json connection profile in a different directory
echo "$(json_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > network-config/network-config-distributors.json

## prepare connection profile for orgretailers
ORG=Retailers
PEER=retailers
P0PORT=6666
P1PORT=6676
P2PORT=6686
CAPORT=6600
PEERPEM=organizations/peerOrganizations/retailers/tlsca/tlsca.retailers-cert.pem
CAPEM=organizations/peerOrganizations/retailers/ca/ca.retailers-cert.pem

echo "$(json_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/retailers/connection-retailers.json
echo "$(yaml_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/retailers/connection-retailers.yaml
# save another copy of json connection profile in a different directory
echo "$(json_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > network-config/network-config-retailers.json

## prepare connection profile for orgcustomers
ORG=Customers
PEER=customers
P0PORT=7777
P1PORT=7787
P2PORT=7797
CAPORT=7700
PEERPEM=organizations/peerOrganizations/customers/tlsca/tlsca.customers-cert.pem
CAPEM=organizations/peerOrganizations/customers/ca/ca.customers-cert.pem

echo "$(json_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/customers/connection-customers.json
echo "$(yaml_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/customers/connection-customers.yaml
# save another copy of json connection profile in a different directory
echo "$(json_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > network-config/network-config-customers.json

## prepare connection profile for orgsuppliers
ORG=Suppliers
PEER=suppliers
P0PORT=8888
P1PORT=8898
P2PORT=8908
CAPORT=8800
PEERPEM=organizations/peerOrganizations/suppliers/tlsca/tlsca.suppliers-cert.pem
CAPEM=organizations/peerOrganizations/suppliers/ca/ca.suppliers-cert.pem

echo "$(json_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/suppliers/connection-suppliers.json
echo "$(yaml_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/suppliers/connection-suppliers.yaml
# save another copy of json connection profile in a different directory
echo "$(json_ccp $ORG $PEER $P0PORT $P1PORT $P2PORT $CAPORT $PEERPEM $CAPEM)" > network-config/network-config-suppliers.json




