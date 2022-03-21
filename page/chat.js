import { ConversationList } from "../chat/conversationList.js";
import { ConversationInfo } from "../chat/conversationinfo.js";

class Chat {
  activeConversation;

  container = document.createElement("div");
  btnLogout = document.createElement("button");

  conversationList = new ConversationList ();
  conversationInfo = new ConversationInfo();

  constructor() {

    this.container.appendChild(this.conversationList.container);
    this.conversationList.setOnConversationItemClick(this.setActiveConversation);
    this.subcribeConversation();
    this.container.appendChild(this.conversationInfo.container);


    // this.container.innerHTML = "Chat";

    // this.btnLogout.innerHTML = "Log out";
    // this.btnLogout.addEventListener("click", this.handleLogout);

    // this.container.appendChild(this.btnLogout);
  }

  setActiveConversation = (conversation) => {
    this.activeConversation = conversation;
    console.log({ conversation });
    this.conversationInfo.setName(conversation.name);
    this.conversationList.setStyleActiveConversation(conversation);
    // this.conversationList.setOnConversationItemClick(conversation);
  }

  subcribeConversation = () => {
    db.collection("conversations").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            console.log("New conversation: ", change.doc.data());

            this.conversationList.handleCreateConversationAdded(
              change.doc.id,
              change.doc.data().name,
              change.doc.data().users,
            );
        }
        if (change.type === "modified") {
            console.log("Modified conversation: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed conversation: ", change.doc.data());
            this.conversationList.removedItem(change.doc.id);
        }
    });
    });
  }

  
}

export { Chat };
