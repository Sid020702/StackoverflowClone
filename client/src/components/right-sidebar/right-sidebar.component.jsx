import React from 'react'
import './right-sidebar.styles.css'
import Widget from '../widget/widget.component'
import WidgetTags from '../widget-tags/widget-tags.component'
const RightSidebar = () => {
    return (
        <aside className='right-sidebar'>
            <Widget />
            <WidgetTags />
        </aside>
    )
}

export default RightSidebar