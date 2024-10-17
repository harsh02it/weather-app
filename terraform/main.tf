provider "azurerm" {
  features {}
}

# Create Resource Group
resource "azurerm_resource_group" "example" {
  name     = var.resource_group_name
  location = var.location
}

# Create a Virtual Network
resource "azurerm_virtual_network" "example" {
  name                = "myVNet"
  address_space       = ["10.0.0.0/16"]
  location            = var.location
  resource_group_name = azurerm_resource_group.example.name
}

# Create a Subnet
resource "azurerm_subnet" "example" {
  name                 = "mySubnet"
  resource_group_name  = azurerm_resource_group.example.name
  virtual_network_name = azurerm_virtual_network.example.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Create a Public IP
resource "azurerm_public_ip" "example" {
  name                = "myPublicIP"
  location            = var.location
  resource_group_name = azurerm_resource_group.example.name
  allocation_method   = "Dynamic"
}

# Create a Network Interface
resource "azurerm_network_interface" "example" {
  name                = "myNIC"
  location            = var.location
  resource_group_name = azurerm_resource_group.example.name

  ip_configuration {
    name                          = "myNICConfiguration"
    subnet_id                     = azurerm_subnet.example.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.example.id
  }
}

# Create a Virtual Machine
resource "azurerm_linux_virtual_machine" "example" {
  name                  = var.vm_name
  location              = var.location
  resource_group_name   = azurerm_resource_group.example.name
  network_interface_ids = [azurerm_network_interface.example.id]
  size                  = "Standard_DS1_v2"

  admin_username = var.vm_admin_username
  admin_password = var.vm_admin_password

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }

  # Install Docker, Git, and Jenkins
  custom_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y docker.io git
              sudo apt-get install -y openjdk-11-jdk
              curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \
              /usr/share/keyrings/jenkins-keyring.asc > /dev/null
              echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
              https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
              /etc/apt/sources.list.d/jenkins.list > /dev/null
              sudo apt-get update
              sudo apt-get install -y jenkins
              sudo systemctl start jenkins
              sudo systemctl enable jenkins
  EOF
}

# Create an AKS Cluster
resource "azurerm_kubernetes_cluster" "example" {
  name                = var.aks_cluster_name
  location            = var.location
  resource_group_name = azurerm_resource_group.example.name
  dns_prefix          = "myakscluster"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = "Development"
  }
}
