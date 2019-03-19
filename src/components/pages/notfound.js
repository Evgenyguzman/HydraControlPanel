import React from 'react'
import PageTemplate from './pageTemplate'

const NotFound = ({ location }) => 
  <PageTemplate>
    <div className="notFound">
      <h1>Not Found Page at '{location.pathname}'</h1>
    </div>
  </PageTemplate>

export default NotFound