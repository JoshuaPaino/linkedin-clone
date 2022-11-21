import React, { useEffect, useState } from 'react'
import './Feed.css'
import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption';
// Icon
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArticleIcon from '@mui/icons-material/Article';
import Post from './Post';
//fire base
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Avatar } from '@mui/material';

function Feed() {
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        db.collection("posts").orderBy('timestamp', "desc").onSnapshot(snapshot => (
            setPosts(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ))
    }, []);

    const sendPost = e => {
        //prevent refresh
        e.preventDefault();
        db.collection('posts').add({
            name: 'Joshua',
            description: "this is a test",
            message: input,
            photoUrl: '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput('');
    };
    return (
        <div className='feed'>
            <div className="feed__inputContainer">

                <div className='feed__inputContained'>
                    <Avatar />
                    <div className="feed__input">
                        <CreateIcon />
                        <form>
                            <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Start a post"></input>
                            <button onClick={sendPost} type="submit">Send</button>
                        </form>
                    </div>

                </div>
                <div className="feed__inputOptions">
                    <InputOption title="Photo" Icon={AddToPhotosIcon} color="blue" />
                    <InputOption title="Video" Icon={VideoCallIcon} color="orange" />
                    <InputOption title="Event" Icon={CalendarMonthIcon} color="grey" />
                    <InputOption title="Write article" Icon={ArticleIcon} color="green" />

                </div>
            </div >

            {/* Posts*/}
            {
                posts.map(({ id, data: { name, description, message, photoUrl } }) => (
                    <Post
                        key={id}
                        name={name}
                        description={description}
                        message={message}
                        photoUrl={photoUrl}
                    />
                ))
            }

        </div >
    )
}

export default Feed