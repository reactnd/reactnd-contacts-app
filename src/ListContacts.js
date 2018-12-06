import React from 'react';

function ListContacts(props) {
  return (
    <div>
      <ol className="ordered-list">
        {props.contacts.map(contact => (
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
            <button
              onClick={() => props.onDeleteContact(contact)}
              className="contact-remove"
            >
              Remove
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ListContacts;
