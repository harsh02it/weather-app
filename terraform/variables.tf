variable "resource_group_name" {
  default = "weather-app-resource_group"
}

variable "location" {
  default = "eastus"
}

variable "vm_admin_username" {
  default = "azureuser"
}

variable "vm_admin_password" {
  default = "Password1234"
}

variable "aks_cluster_name" {
  default = "myAKSCluster"
}

variable "vm_name" {
  default = "WeatherAppVM"
}
