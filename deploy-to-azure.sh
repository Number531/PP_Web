#!/bin/bash

# Azure deployment script for Interactive Hollow Sphere
# This script creates and deploys to Azure Static Web Apps

# Configuration variables
RESOURCE_GROUP="psqrd-resource-group"
LOCATION="eastus2"
APP_NAME="psqrd-hollow-sphere"
GITHUB_REPO="https://github.com/YOUR_USERNAME/interactive-hollow-sphere-2"
GITHUB_BRANCH="main"
CUSTOM_DOMAIN="psqrd.ai"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting deployment to Azure Static Web Apps...${NC}"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo -e "${RED}Azure CLI is not installed. Please install it first.${NC}"
    echo "Visit: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Login to Azure
echo -e "${BLUE}Logging in to Azure...${NC}"
az login

# Create resource group if it doesn't exist
echo -e "${BLUE}Creating resource group if it doesn't exist...${NC}"
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create Static Web App
echo -e "${BLUE}Creating Azure Static Web App...${NC}"
az staticwebapp create \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --location $LOCATION \
    --source $GITHUB_REPO \
    --branch $GITHUB_BRANCH \
    --app-location "/" \
    --output-location ".next" \
    --login-with-github

# Get the deployment token
echo -e "${BLUE}Getting deployment token...${NC}"
DEPLOYMENT_TOKEN=$(az staticwebapp secrets list --name $APP_NAME --resource-group $RESOURCE_GROUP --query "properties.apiKey" -o tsv)

echo -e "${GREEN}Deployment token: $DEPLOYMENT_TOKEN${NC}"
echo -e "${GREEN}Please add this token as a secret in your GitHub repository with the name AZURE_STATIC_WEB_APPS_API_TOKEN${NC}"

# Add custom domain
echo -e "${BLUE}Adding custom domain...${NC}"
az staticwebapp hostname add \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --hostname $CUSTOM_DOMAIN

echo -e "${GREEN}Deployment completed!${NC}"
echo -e "${GREEN}Your app will be available at: https://$CUSTOM_DOMAIN${NC}"
echo -e "${GREEN}Default Azure URL: https://$APP_NAME.azurestaticapps.net${NC}"
echo -e "${BLUE}Note: You need to configure your domain's DNS settings to point to Azure. Follow the instructions in the Azure portal.${NC}"
