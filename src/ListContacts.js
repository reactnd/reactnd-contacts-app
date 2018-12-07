import React from 'react';

const ListContacts = ({contacts}) => {

  return (
    <ol className="ordered-list">
    {contacts.map(contact => (
      <li key={contact.id} className="contact-list-item">
        <div
          className="contact-avatar"
          style={{
            backgroundImage: `url(${contact.avatarURL})`
          }}
        />
        <div className="contact-details">
          <p>{contact.name}</p>
          <p>{contact.handle}</p>
        </div>
        <button className="contact-remove">Remove</button>
      </li>
    ))}
  </ol>
  )
}

export default ListContacts;
