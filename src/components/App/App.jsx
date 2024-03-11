import React, { Component } from 'react';
import shortid from 'shortid';
import SectionTitle from '../SectionTitle/SectionTitle';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import contacts from '../../contacts.json';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: contacts,
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    const isExist = this.state.contacts.find(
      contact => contact.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <main className={css.appContainer}>
        <SectionTitle text="Phonebook" />
        <ContactForm addContact={this.addContact} />

        <SectionTitle text="Contacts" />
        <Filter
          filter={this.state.filter}
          filterChangeHandler={this.handleFilterChange}
        />
        <ContactList
          contacts={this.state.contacts.filter(contact =>
            contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
          )}
          onDeleteContact={this.deleteContact}
        />
      </main>
    );
  }
}

export default App;
