pragma solidity >=0.4.22 <0.6.0;

contract Certificate{
    string id;
    string name;
    string degree;
    string college;
    string score;
    string batch;
    string issueDate;
    
    bool certValidity;
    bytes32 userSign;
    bytes32 govtSign;
    bytes32 issuerSign;
    
    
    uint signCount = 0;
    bool govtReq = false;
    bool issuerReq = false;
    bool userReq = false;
    
    constructor(string memory _id, string memory _name, string memory _degree, string memory _clg, 
        string memory _score, string memory _batch, string memory _issueDate, bytes32 _issuerSign, bytes32 _govtSign) public{
        
        id = _id;
        name = _name;
        degree = _degree;
        college = _clg;
        score = _score;
        batch = _batch;
        issueDate = _issueDate;
        
        issuerSign = _issuerSign;
        govtSign = _govtSign;
        certValidity = true;
    }
    
    function getId() view public returns (string memory){
        return id;
    }
    
    function getName() view public returns (string memory){
        return name;
    }
    
    function getDegree() view public returns (string memory){
        return degree;
    }
    
    function getIssuerSign() view public returns (bytes32){
        return issuerSign;
    }
    
    function getCollege() view public returns (string memory){
        return college;
    }
    
    function getScore() view public returns (string memory){
        return score;
    }
    
    function getBatch() view public returns (string memory){
        return batch;
    }
    
    function getIssueDate() view public returns (string memory){
        return issueDate;
    }
    
    
    //Sign by user
    function userSigning(bytes32 _userSign) public {
        userSign = _userSign;
    }
    
    //Revoke certificate
    function revokeReq (bytes32 mSign) public {
        if(mSign == issuerSign && issuerReq == false){
            issuerReq = true;
            signCount = signCount + 1;
        }
        else if(mSign == govtSign && govtReq == false){
            govtReq = true;
            signCount = signCount + 1;
        }
        else if(mSign == govtSign && govtReq == false){
            userReq = true;
            signCount  = signCount + 1;
        }
        else {
            return;
        }
        
        if(signCount >=2 && signCount <= 3){
            certValidity = false;
            signCount = 0;
            userReq = false;
            issuerReq = false;
            govtReq = false;
            return;
        }
    }
    
    
    //Validate certificate
    function validateReq (bytes32 mSign) public {
        if(mSign == issuerSign && issuerReq == false){
            issuerReq = true;
            signCount = signCount + 1;
        }
        else if(mSign == govtSign && govtReq == false){
            govtReq = true;
            signCount = signCount + 1;
        }
        else if(mSign == govtSign && govtReq == false){
            userReq = true;
            signCount  = signCount + 1;
        }
        else {
            return;
        }
        
        if(signCount >=2 && signCount <= 3){
            certValidity = true;
            signCount = 0;
            userReq = false;
            issuerReq = false;
            govtReq = false;
            return;
        }
    }
}