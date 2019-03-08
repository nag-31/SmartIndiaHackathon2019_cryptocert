pragma solidity >=0.4.22 <0.6.0;

contract Certificate{
    bool onetimeaccess=false;
    bool onetimekey=true;
    string Master;
    bool Ikey=false;
    bool Ukey=false;
    bool Gkey=false;
    bool valid=true;
    address UPass;
    address IPass;
    address GPass;
    string UID="0";
    
    string name;
    string father;
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
        Master="CryptoCreds";
        IPass = msg.sender;
        GPass = 0x4C249B6924e31aaD19607b005829a7349426f07c;
    }
    
    // setUser address
    function setUPass (string memory  pass)  public returns (bool){
        if (onetimekey==true){
            if ( stringsEqual(Master,pass)){
                UPass=msg.sender;
                onetimekey=false;
                return true;
            }
        }
        
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
    
    
    
    
  // owner condition function
    modifier onlyOwner() {
    require(msg.sender == IPass);
    _;
    }
  
    
    //getters
    
    
    function getOwnerAddress() view public returns (address ){
        return IPass;
    }

    function issuerkey() public returns (bool ){
        if( msg.sender==IPass) {
            Ikey=true;
            return true; // function executed succesfully
        }
        else return  false;
    }
    function govtkey() public returns (bool ){
        if( msg.sender==GPass) {
            Gkey=true;
            return true ;//succes
        }
        else return false;
    }
    function userkey() public returns (bool ){
        if( msg.sender==UPass) {
            Ukey=true;
            return true;
        }
        else return false;
    }
    
    
    function access () private returns (bool) {
        
        if  (msg.sender == IPass ){
            
        
            if ( (Ikey && Gkey) || (Ikey && Ukey) || (Ukey && Gkey) ) { 
    
                Ikey=false;
                Gkey=false;
                Ukey=false;
                return true;
            
            }
        }
        
    }
    
    function revoke() public returns (bool) {
        
        if  (msg.sender == IPass ){
            
        
            if ( (Ikey && Gkey) || (Ikey && Ukey) || (Ukey && Gkey) ) { 
    
                valid = false;
                Ikey=false;
                Gkey=false;
                Ukey=false;
                return true;
            
            }
        }
        
    }
    
    // ignore the below function for now
    
    function accessAll()  public returns ( bool,
    string memory,
    bool ,
    bool ,
    bool ,
    bool ,
    address ,
    address,
    address ,
    string memory,
    
    string memory  ){    
        if ( access() ==  true)
        return (onetimekey,Master,Ikey,Ukey,Gkey,valid,UPass,IPass,GPass,UID,name) ;
        
    }
    
    // cpmpare two strings 
    function stringsEqual(string storage _a, string memory _b) internal returns (bool) {
		bytes storage a = bytes(_a);
		bytes memory b = bytes(_b);
		if (a.length != b.length)
			return false;
		// @todo unroll this loop
		for (uint i = 0; i < a.length; i ++)
			if (a[i] != b[i])
				return false;
		return true;
	}
    


/* inputs to costructor 

"sfsdfs","nag","btech","tkr","99","2016-2200"
*/



function accessAlldumb() view public returns ( bool,
    string memory,
    bool ,
    bool ,
    bool ,
    bool ,
    address ,
    address,
    address ,
    string memory,
    
    string memory) {    
        if (msg.sender==IPass || msg.sender==UPass || msg.sender==GPass)
        return (onetimekey,Master,Ikey,Ukey,Gkey,valid,UPass,IPass,GPass,UID,name) ;
        
    }
    
}