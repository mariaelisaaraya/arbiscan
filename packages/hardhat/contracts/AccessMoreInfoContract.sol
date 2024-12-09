// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccessMoreInfoContract {
    mapping(address => bool) public owners;
    address[] ownerList;
    uint256 public infoAccessPrice = 0.0001 ether;
    mapping(address => bool) public withdrawalApprovals;
    uint256 public approvalsCount;

    event InfoAccessed(address indexed user, uint256 amountPaid, address indexed targetContract);
    event WithdrawInitiated(address indexed by);
    event WithdrawCompleted(address indexed by, uint256 amount);

    modifier onlyOwners() {
        require(owners[msg.sender], "Solo los owners pueden realizar esta accion");
        _;
    }

    constructor(address[] memory initialOwners) {
        require(initialOwners.length == 3, "Debe haber exactamente 3 owners");
        for (uint256 i = 0; i < initialOwners.length; i++) {
            owners[initialOwners[i]] = true;
            ownerList.push(initialOwners[i]);
        }
    }

    function getOwners() external view returns (address[] memory) {
        return ownerList;
    }

    function setInfoAccessPrice(uint256 newPrice) external onlyOwners {
        infoAccessPrice = newPrice;
    }
        function accessMoreInfo(address user, address targetContract) external payable {
        require(user != address(0), "Por favor, proporciona una direccion de usuario valida");
        require(targetContract != address(0), "Por favor, proporciona una direccion de contrato valida");
        require(msg.value == infoAccessPrice, "Debes enviar exactamente el monto requerido para acceder a la informacion");

        emit InfoAccessed(user, msg.value, targetContract);
    }

    function approveWithdrawal() external onlyOwners {
        require(!withdrawalApprovals[msg.sender], "Ya has aprobado esta accion");
        withdrawalApprovals[msg.sender] = true;
        approvalsCount++;

        emit WithdrawInitiated(msg.sender);

        if (approvalsCount == ownerList.length) {
            _withdraw();
        }
    }

    function _withdraw() private {
        uint256 balance = address(this).balance;
        require(balance > 0, "No hay fondos para retirar");
        uint256 share = balance / ownerList.length;

        // Transferir la misma cantidad a cada propietario
        for (uint256 i = 0; i < ownerList.length; i++) {
            payable(ownerList[i]).transfer(share);
        }

        // Restablecer las aprobaciones y contador
        for (uint256 i = 0; i < ownerList.length; i++) {
            withdrawalApprovals[ownerList[i]] = false;
        }
        approvalsCount = 0;

        emit WithdrawCompleted(msg.sender, balance);
    }

    // Función para consultar el balance actual del contrato
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    // Permitir que el contrato reciba pagos directamente
    receive() external payable {}
}