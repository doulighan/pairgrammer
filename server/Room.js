class Room {

  constructor(name, id, owner){
    this.name = name
    this.id = id
    this.owner = owner
    this.people = []
    this.peopleLimit = 4
    this.code = ''
    this.status = 'available'
    this.private = false
  }

  addPerson(person) {
    if(this.status === 'available') {
      this.people.push(person)
    }
  }

  removePerson(person) {
    var personIndex = -1
    for(var i = 0; i < this.people.length; i++) {
      if(this.people[i].id === person.id) {
        personIndex = i
        break
      }
    }
    if (personIndex > -1) {
        this.people.splice(personIndex, 1);
    }
  }

  getPerson(personID) {
    var person = null
    for (var i = 0; i < people.length; i++) {
      if (this.people[i].id === personID) {
        person = this.people[i]
      }
    }
    return person
  }

  isAvailable() {
    return this.available === 'available'
  }

  isPrivate() {
    return this.private
  }
}

module.exports = Room