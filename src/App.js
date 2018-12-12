import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact'

class App extends Component {
  state = {
    contacts: [],
    screen: 'list'
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

  render() {
    return (
      <div>
        {this.state.screen === 'list' &&(
        <ListContacts
        onNavigate={() => {
          this.setState(()=> ({
            screen: 'create'
          }))
        }}
        contacts={this.state.contacts}
        onDeleteContact={this.removeContact}
      />
        )}
        {this.state.screen === 'create' && (
        <CreateContact />
        )}

      </div>
    );
  }
}

export default App;
