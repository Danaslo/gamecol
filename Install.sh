#!/bin/bash
set -e
mv /gamecol-1.0.0 /gamecol
echo "Instalando dependencias del servidor..."
cd /gamecol/server
npm install