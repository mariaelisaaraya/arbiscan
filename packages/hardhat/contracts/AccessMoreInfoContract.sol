// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccessMoreInfoContract {
    mapping(address => bool) public owners;
    address[] ownerList;
    uint256 public infoAccessPrice = 0.01 ether;
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
    // Permitir que el contrato reciba pagos directamente
    receive() external payable {}
}