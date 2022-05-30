import React from "react";

 function Footer(){
     return(
      
        <div className='text-center p-3' style={{ backgroundColor: 'dark', position: 'fixed', width: '100%',bottom: '0', color:'white' }}>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a className='text-white' href='https://adylnet.com.br/'>
            Adylnet
          </a>
        </div>
      
     );
 }

 export default Footer;

