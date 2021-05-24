// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Address.sol";

import "./IERC20.sol";
import "./extensions/IERC20Metadata.sol";
import "../../utils/Context.sol";

/// @title EIP-20: ERC-20 Token Standard
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Implementation of the basic standard token.
contract CoinCoin {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    string private _name;
    string private _symbol;
    uint256 private _totalSupply;

    address private _owner;
    uint8 private _decimals;

    //EVENTS

    event Transfer(
        address indexed sender,
        address indexed recipient,
        uint256 amount
    );
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor(address owner_, uint256 totalSupply_) {
        _name = "CoinCoin";
        _symbol = "COIN";
        _owner = owner_;
        _totalSupply = totalSupply_;
        _balances[owner_] = totalSupply_;
        emit Transfer(address(0), owner_, totalSupply_);
    }

    modifier onlyOwner() {
        require(
            msg.sender == _owner,
            "CoinCoin: Only owner can call this function"
        );
        _;
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
        require(
            _balances[msg.sender] >= amount,
            "CoinCoin: There is not enough funds to transfer"
        );
        require(
            recipient != address(0),
            "CoinCoin: transfer to the zero address"
        );
        _balances[msg.sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        require(spender != address(0), "CoinCoin: approve to the zero address");
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public returns (bool) {
        require(
            _allowances[sender][msg.sender] >= amount,
            "CoinCoin: transfer amount exceeds allowance"
        );
        require(
            _balances[sender] >= amount,
            "CoinCoin: There is not enough funds to transfer"
        );
        require(
            recipient != address(0),
            "CoinCoin: cannot be the zero address"
        );
        _allowances[sender][msg.sender] -= amount;
        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
    }

    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "CoinCoin: mint to the zero address");
        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address owner_) public view returns (uint256 balance) {
        return _balances[owner_];
    }

    function allowance(address owner_, address spender_)
        public
        view
        returns (uint256)
    {
        return _allowances[owner_][spender_];
    }
}
