import React from 'react'
import LeftSidebar from '../../components/left-sidebar/left-sidebar.component'
import TagsList from './tags-list.component'
import './tags.styles.css'
const Tags = () => {
    const tagsList = [{
        id: 1,
        tagName: "javascript",
        tagDesc: "For questions regarding programming in ECMAScript (Javascript/JS) and its various dialects and implementations for programming."
    }, {
        id: 2,
        tagName: "python",
        tagDesc: "Python is a computer programming language often used to build websites and software, automate tasks, and conduct data analysis"
    }, {
        id: 3,
        tagName: "c#",
        tagDesc: "C# (C-Sharp) is a programming language developed by Microsoft that runs on the .NET Framework. C# is used to develop web apps, desktop apps, mobile apps, games and much more."
    }, {
        id: 4,
        tagName: "java",
        tagDesc: "One of the most widely used programming languages, Java is used as the server-side language for most back-end development projects."
    }, {
        id: 5,
        tagName: "php",
        tagDesc: "PHP is a server-side scripting language embedded in HTML in its simplest form. PHP allows web developers to create dynamic content and interact with databases."
    }, {
        id: 6,
        tagName: "html",
        tagDesc: "HTML is the standard markup language for Web pages. With HTML you can create your own Website."
    }, {
        id: 7,
        tagName: "android",
        tagDesc: "The Android operating system is a mobile operating system that was developed by Google (GOOGL​) to be primarily used for touchscreen devices, cell phones, and tablets."
    }, {
        id: 8,
        tagName: "css",
        tagDesc: "CSS is the language we use to style an HTML document.CSS describes how HTML elements should be displayed."
    }, {
        id: 9,
        tagName: "Reactjs",
        tagDesc: "The React.js framework is an open-source JavaScript framework and library developed by Facebook. It’s used for building interactive user interfaces and web applications quickly and efficiently with significantly less code than you would with vanilla JavaScript"
    }, {
        id: 10,
        tagName: "node.js",
        tagDesc: "Node.js is and evnt-based, non-blocking, asynchronous I/) rutime that uses Google's VB Javascript engine."
    },]
    return (
        <div className="home-container-1">
            <LeftSidebar />
            <div className="home-container-2">
                <h1 className='tags-h1'>Tags</h1>
                <p className='tags-p'>A tag is a keyord or label that categorizes your question with other, similar questions. </p>
                <p className='tags-p'>Using the right tags makes it easier for others to find and answer your question. </p>
                <div className="tags-list-container">
                    {
                        tagsList.map(tag => (
                            <TagsList tag={tag} key={tag.id} />
                        ))
                    }
                </div>



            </div>
        </div>
    )
}

export default Tags