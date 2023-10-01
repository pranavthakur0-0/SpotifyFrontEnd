import { useState } from "react";
import { useCookies } from "react-cookie";
import MusicSvg from "../images/musicIcon.svg"
import MusicImg from "../images/imageIcon.svg"
import PreviewSvg from "../images/AddImage.svg"
import { useUser } from "../context/contextProvider";
import { backendUrl } from "../utils/Config";
import { authenticatedGetRequest } from "../utils/ServerHelpers";


function InputBox({setDetailsName,type,placeholder}){

  const handleDetails = (e)=>{
    setDetailsName((info)=>({
            ...info,
            [e.target.name] : e.target.value
      }));
  }
  return (<input onChange={handleDetails} style={{fontFamily : "spotify-book"}} type="text" id={`${type}`} name={`${type}`} placeholder={`${placeholder}`} autoComplete='off' className=" lg:w-[30rem] text-sm h-9 rounded-[3px] bg-[#121212] p-2 shadow-[0px_0px_0px_0.5px_rgba(255,255,255,0.8)] outline-none focus:shadow-[0px_0px_0px_1.5px_rgba(255,255,255,1)] hover:shadow-[0px_0px_0px_1px_rgba(255,255,255,1)] transition-all ease-in-out" />)
}

function Label({heading ,...props}){
  return (  <label htmlFor="songName" className="flex">
                  <div className="flex flex-col gap-1"> 
                     <span className=" font-spotifyBook">{heading}</span>
                      {props.children}
                  </div>
            </label>)
}


function Title (props){
  return ( <span className=" text-sm font-spotifyLight text-[--dark-text] tracking-wide">{props.children} </span>)
}

export default function UploadSong() {
  
    const { user } = useUser();
    const [songFile, setSongFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setpreview] = useState(null);
    const [songDetails, setDetailsName] = useState({
      songName : '',
      description : '',
    });
    const [Cookie,] = useCookies(['userId']);
  
    const handleSongChange = (event) => {
      setSongFile(event.target.files[0]);
    };
  
    const handleImageChange = (event) => {
      const inputFile = event.target.files[0];
      if (inputFile) {
        const newImage = new Image();
        newImage.src = URL.createObjectURL(inputFile);
        newImage.onload = function () {
          if (newImage.width === 3000 && newImage.height === 3000) {
            setImageFile(inputFile);
            setpreview(newImage.src);
          } else {
            URL.revokeObjectURL(newImage.src);
            event.target.value = ''; // Clear the file input value
            setImageFile(null); // Set the imageFile state to null
            setpreview(null);
          }
        }
      }
    };

    const handleUpload = async () => {
        const route = '/songs';
        const formdata = new FormData();
        formdata.append('text', JSON.stringify(songDetails));
        if(imageFile){
          formdata.append('image', imageFile);
      }if(songFile){
          formdata.append("song", songFile);
      }
          const response = await fetch(backendUrl + route, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${Cookie.userId}`,
            },
            body: formdata,
        });
        console.log(response);
      }
      
      const handleRequest = async()=>{
        const route = '/cloud';
        const res = await  authenticatedGetRequest(route, Cookie);
        console.log(res);
      }


  return (
    <>
      <div className="flex relative h-full flex-col">
        <div className="py-2 px-5 lg:px-10 h-full text-white  flex">
             <div className=" flex-1 flex flex-col gap-7">
             <Label htmlFor="songName" heading="Song Name*">
                  <InputBox setDetailsName={setDetailsName} type="songName" placeholder="Email"></InputBox>
             </Label>

             <Label htmlFor="description" heading="Song Description*">
                <InputBox setDetailsName={setDetailsName} type="description" placeholder="Description"></InputBox>
             </Label>
              <div className="flex gap-5">
              <label htmlFor="musicFile" className="w-fit cursor-pointer">
                  <div className="h-[5vw] px-3 pr-5 w-fit bg-[--background-tinted-base] hover:bg-[--track-list] flex justify-center items-center rounded-lg gap-2">
                        <img src={MusicSvg} alt="MusicSvg" />
                        <span>Upload song</span>
                  </div>
                 <input className="hidden" type="file" name="musicFile" id="musicFile" accept=".mp3" onChange={handleSongChange} />
             </label>

             <label htmlFor="imageFile" className="w-fit cursor-pointer">
                  <div className="h-[5vw] px-3 pr-5 w-fit bg-[--background-tinted-base] hover:bg-[--track-list] flex justify-center items-center rounded-lg gap-2">
                        <img src={MusicImg} alt="MusicImg" />
                        <span>Upload Image</span>
                  </div>
                 <input className="hidden" type="file" name="imageFile" id="imageFile" accept="image/*" onChange={handleImageChange} />
             </label>
              </div>

            {/* <label htmlFor="description">Song Description*</label>
            <input id="description" onChange={handleName} type="text" name="name"  />
            <input type="file" accept=".mp3" onChange={handleSongChange} />
            <input type="file" accept="image/*" onChange={handleImageChange} /> */}
            <button className="h-fit w-fit px-5 py-3 rounded-xl bg-primary text-black" onClick={handleUpload}>Upload</button>
            <button onClick={handleRequest}>Cloudinary test</button>
             </div>
             <div className="w-[417px] p-5 flex flex-col">
                 <div className="pb-5"> {preview ? <img className="rounded-lg" src={preview} alt="preview" /> : <div className="bg-[--home-card] h-[377px] w-[377px] flex rounded-lg justify-center items-center"><img className="h-20 w-20" src={PreviewSvg} alt="PreviewSvg" /></div>}</div>
             <div className="flex gap-4 flex-col w-full">
                  <div className="text-sm flex flex-col"> 
                    <Title>Song Name</Title>
                    <span className="h-8 min-w-1 font-spotify text-2xl w-[20rem] truncate">{songDetails?.songName}</span></div>
                  <div className="text-sm flex flex-col">   
                  <Title>Artist</Title>
                    <span className="w-fit h-8 min-w-1 font-spotifyBook text-wider hover:underline cursor-pointer text-[--dark-text]">{user?.username}</span></div>
                  <div className="text-sm flex flex-col">
                  <Title>Description</Title>
                  <span className="w-fit text-sm font-spotifyLight text-[--dark-text] break-all">{songDetails?.description}</span>
                  </div>
             </div>
             </div>
        </div>
      </div>
    </>
  );
}
