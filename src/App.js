import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState(() => ({
        contacts
      }));
    });
  }

  /** >>> Remove contact */
  /* Udacity: update local state and backend server */
  removeContact = contact => {
    this.setState(currentState => ({
      contacts: currentState.contacts.filter(c => {
        return c.id !== contact.id;
      })
    }));

    ContactsAPI.remove(contact);
  };

  /* RS: remove from backend then fetch all from backend to update local state */
  updateContactsRS = () => {
    ContactsAPI.getAll().then(contacts => {
      this.setState(() => ({
        contacts
      }));
    });
  };

  removeContactRS = contact => {
    ContactsAPI.remove(contact).then(this.updateContacts);
  };

  /*** <<<  */
  createContact = (contact) => {
    ContactsAPI.create(contact)
    .then((contact) => {
      this.setState((currentState)=>({
        contacts: currentState.contacts.concat([contact])
      }))
    })
  }


  render() {
    return (
      <div>
        <Route exact
          path="/"
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />
          )}
        />
        <Route path='/create'
        render={({history}) => (
          <CreateContact
          onCreateContact={(contact) => {
            this.createContact(contact)
            history.push('/')
          }}
          />
        )}
        />

      </div>
    );
  }
}

export default App;
