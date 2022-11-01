
class Task {
    constructor (important, title, desc, priority, dueDate, color, contact, participants){
        this.important = important;
        this.title = title;
        this.description = desc;
        this.priority = priority;
        this.dueDate = dueDate;
        this.color = color;
        this.contact = contact;
        this.participants = participants;

        this.developer = "Brenda";
    }
    test() {
        console.log("Test");
    }
}