class FamilyMember {
    constructor(firstName) {
        this.firstName = firstName;
        this.itemsNeeded = [];
    }
}

class VacationPlanner {
    constructor() {
        // Initialize familyMembers from local storage, or create an empty array if it doesn't exist.
        this.familyMembers = JSON.parse(localStorage.getItem("familyMembers")) || [];
    }

    async addFamilyMember(firstName) {
        const familyMember = new FamilyMember(firstName);
        this.familyMembers.push(familyMember);
        await this.saveToLocalStorage();
        return familyMember;
    }

    async updateItems(firstName, action, oldItem, newItem) {
        const familyMember = this.familyMembers.find((member) => member.firstName === firstName);

        if (familyMember) {
            if (action === "1" || action === "2") {
                if (newItem) {
                    familyMember.itemsNeeded.push(newItem);
                    await this.saveToLocalStorage();
                }
            } else if (action === "3") {
                if (oldItem) {
                    familyMember.itemsNeeded = familyMember.itemsNeeded.filter((item) => item !== oldItem);
                    await this.saveToLocalStorage();
                }
            }
        }
    }

    async deleteFamilyMember(firstName) {
        const index = this.familyMembers.findIndex((member) => member.firstName === firstName);
        if (index !== -1) {
            this.familyMembers.splice(index, 1);
            await this.saveToLocalStorage();
        }
    }

    displayFamilyMembers() {
        if (this.familyMembers.length === 0) {
            console.log("There are no family members added yet.");
        } else {
            console.log("Family Members:");
            this.familyMembers.forEach((member) => {
                console.log(`${member.firstName}'s items: ${member.itemsNeeded.join(", ")}`);
            });
        }
    }

    async saveToLocalStorage() {
        localStorage.setItem("familyMembers", JSON.stringify(this.familyMembers));
    }
}

const planner = new VacationPlanner();

// Add event listeners for form submissions and buttons
document.getElementById("addFamilyMember").addEventListener("click", async function () {
    const firstName = document.getElementById("firstName").value.trim();
    if (firstName) {
        const familyMember = await planner.addFamilyMember(firstName);
        // Display the new family member
        const familyList = document.getElementById("family-list");
        const familyMemberDiv = document.createElement("div");
        familyMemberDiv.textContent = familyMember.firstName;
        familyList.appendChild(familyMemberDiv);
    }
});

document.getElementById("updateItems").addEventListener("click", async function () {
    const firstName = document.getElementById("updateFirstName").value;
    const action = document.getElementById("updateAction").value;

    if (firstName) {
        const familyMember = planner.familyMembers.find((member) => member.firstName === firstName);

        if (familyMember) {
            const updateItemFields = document.getElementById("updateItemFields");

            if (action === "1" || action === "2") {
                const newItem = prompt("Enter the new item:");
                if (newItem) {
                    await planner.updateItems(firstName, action, "", newItem);
                    familyMember.itemsNeeded.push(newItem);
                }
            } else if (action === "3") {
                const itemToDelete = prompt("Enter the item to delete:");
                if (itemToDelete) {
                    await planner.updateItems(firstName, action, itemToDelete);
                    familyMember.itemsNeeded = familyMember.itemsNeeded.filter((item) => item !== itemToDelete);
                }
            }
        }
    }
});

document.getElementById("deleteFamilyMember").addEventListener("click", async function () {
    const firstName = document.getElementById("deleteFirstName").value;
    if (firstName) {
        await planner.deleteFamilyMember(firstName);
        // Remove the family member from the display
        const familyList = document.getElementById("family-list");
        const familyMemberDiv = Array.from(familyList.children).find((child) => child.textContent === firstName);
        if (familyMemberDiv) {
            familyList.removeChild(familyMemberDiv);
        }
    }
});

document.getElementById("displayFamilyMembers").addEventListener("click", function () {
    const familyDisplay = document.getElementById("familyDisplay");
    familyDisplay.innerHTML = "";

    if (planner.familyMembers.length === 0) {
        const noMembersMessage = document.createElement("p");
        noMembersMessage.textContent = "There are no family members added yet.";
        familyDisplay.appendChild(noMembersMessage);
    } else {
        const familyMembersHeader = document.createElement("p");
        familyMembersHeader.textContent = "Family Members:";
        familyDisplay.appendChild(familyMembersHeader);

        planner.familyMembers.forEach((member) => {
            const memberInfo = document.createElement("p");
            memberInfo.textContent = `${member.firstName}'s items: ${member.itemsNeeded.join(", ")}`;
            familyDisplay.appendChild(memberInfo);
        });
    }
});

// JavaScript code as provided in the previous response

// Function to toggle the visibility of sections
function toggleSectionVisibility(sectionId, isVisible) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.style.display = isVisible ? "block" : "none";
    }
}

// Add event listeners for navigation
document.getElementById("showAddFamilyMember").addEventListener("click", function () {
    toggleSectionVisibility(".add-family-member", true);
    toggleSectionVisibility(".update-items", false);
    toggleSectionVisibility(".delete-family-member", false);
    toggleSectionVisibility(".display-family-members", false);
});

document.getElementById("showUpdateItems").addEventListener("click", function () {
    toggleSectionVisibility(".add-family-member", false);
    toggleSectionVisibility(".update-items", true);
    toggleSectionVisibility(".delete-family-member", false);
    toggleSectionVisibility(".display-family-members", false);
});

document.getElementById("showDeleteFamilyMember").addEventListener("click", function () {
    toggleSectionVisibility(".add-family-member", false);
    toggleSectionVisibility(".update-items", false);
    toggleSectionVisibility(".delete-family-member", true);
    toggleSectionVisibility(".display-family-members", false);
});

document.getElementById("showDisplayFamilyMembers").addEventListener("click", function () {
    toggleSectionVisibility(".add-family-member", false);
    toggleSectionVisibility(".update-items", false);
    toggleSectionVisibility(".delete-family-member", false);
    toggleSectionVisibility(".display-family-members", true);
});

// Initialize the visibility of sections
toggleSectionVisibility(".add-family-member", false);
toggleSectionVisibility(".update-items", false);
toggleSectionVisibility(".delete-family-member", false);
toggleSectionVisibility(".display-family-members", false);
