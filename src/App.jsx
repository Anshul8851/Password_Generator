import './App.css'
import {useState,useCallback,useEffect,useRef} from 'react';
export default function App() {
  const [length,setLength] = useState(8);
  const [number,setNumber] = useState(false);
  const [char,setChar] = useState(false);
  const [password,setPassword] = useState("");
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(number) str += "0123456789";
    if(char) str += "!@#$%[]{}<>/£-_=+?";
    for(let i = 1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    
  },[length,number,char,setPassword]);
  useEffect(()=>{
    passwordGenerator();
    // jitni bhi bar hm changes krege inme se kisi bhi dependency me utni bar ye function change run hoga
  },[length,number,char,setPassword])
  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password);
  },[password])
  return (
    
   <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
       <h1 className='text-white text-center my-2'>Password Generator</h1>
        <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>
          <input ref={passwordRef} placeholder='password' readOnly  type="text" value={password} className='outline-none w-full py-1 px-3'/>
          <button onClick={copyPassword} className='my-2 outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' >Copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
       <input type="range" min={8} max={100} value={length} onChange={(e)=>{setLength(e.target.value)}} />
        <label>Length: {length}</label>
      </div> 
       
       <div className="flex items-center gap-x-1">
        <input type="checkbox" defaultChecked={number} id="numberInput" onChange={()=>setNumber((prev)=> !prev)} />
         <label htmlFor="numberInput">Numbers</label>
       </div>
       <div className="flex items-center gap-x-1">
         <input type="checkbox" defaultChecked={char} id="charInput" onChange={()=>setChar((prev)=> !prev)} />
          <label htmlFor="charInput">characters</label>
        </div>
       
     </div>
    </div>
   </>
  )
}
