pragma solidity >=0.4.22 <0.6.0;

contract Certificate{
    string name;
    string degree;
    string sign;
    string college;
    string score;
    string batch;
    
    
    constructor(string memory _sign ,string memory _name, string memory _degree, string memory _clg, 
        string memory _score, string memory _batch) public{
        
        sign = _sign;
        name = _name;
        degree = _degree;
        college = _clg;
        score = _score;
        batch = _batch;
    }
    
    
    function getName() view public returns (string memory){
        return name;
    }
    
    function getDegree() view public returns (string memory){
        return degree;
    }
    
    function getSign() view public returns (string memory){
        return sign;
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
}