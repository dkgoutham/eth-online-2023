// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;

contract Session {
    // Enum representing various mental health tags/topics
    enum Tag {
        anxiety,
        depression,
        stressManagement,
        griefAndLoss,
        addiction,
        codependency,
        selfEsteem,
        trauma,
        eatingDisorders,
        angerManagement,
        socialSkills,
        mindfulness,
        sexualAndGenderOrientation
    }

    // Struct representing a group in the app
   struct Group {
        uint256 groupId;           // Unique identifier for the group
        string title;              // Title of the group
        Tag tag;                   // Tag associated with the group
        uint256 numberOfPeers;    // Number of peers in the group
        string day;                // Day of group meetings
        string time;               // Time of group meetings
        uint256 duration;         // Duration of group meetings in minutes
        string groupDescription;  // Description about the group
        address therapistAddress; // Therapist leading the group
        uint256 timeCreated;      // Timestamp when the group was created
        address moderatorAddress; // Address of the moderator who created the group
    }

    // Mappings to associate tags with groups and group IDs with groups
    mapping(Tag => Group[]) private tagToGroups;
    mapping(uint256 => Group) private groupIdToGroup;
    uint256 private nextGroupId = 0; // Counter for generating unique group IDs

    // Struct representing a general user in the app
    struct GeneralUser {
        string username;
        mapping(uint256 => bool) groupMembership; // Membership status for each group by group ID
        uint256 timeJoined;                       // Timestamp when the user joined the app
    }
    
    // Struct representing a moderator in the app
    struct Moderator {
        string username;
        string description;    // Description about the moderator
        uint256 createdTime;   // Timestamp when the moderator was added
    }
    
    // Struct representing a therapist in the app
    struct Therapist {
        string username;
        string speciality;         // Speciality field of the therapist
        string medicalLicenseNumber; // License number of the therapist
        string description;       // Description about the therapist
    }

    // Mappings to store general users, moderators, and therapists by their addresses
    mapping(address => GeneralUser) private generalUsers;
    mapping(address => Moderator) private moderators;
    mapping(address => Therapist) private therapists;

    // Function to check if a user (msg.sender) is already registered
    function isUserRegistered() public view returns(bool) {
        return bytes(generalUsers[msg.sender].username).length != 0;
    }

    // Function to add a new general user
    function addGeneralUser(string memory _username) public {
        require(!isUserRegistered(), "User is already registered.");

        generalUsers[msg.sender].username = _username;
        generalUsers[msg.sender].timeJoined = block.timestamp;
    }

    // Function to add a new moderator
    function addModerator(string memory _username, string memory _description) public {
        Moderator memory newModerator;
        newModerator.username = _username;
        newModerator.description = _description;
        newModerator.createdTime = block.timestamp;

        moderators[msg.sender] = newModerator;
    }

    // Function to add a new therapist
    function addTherapist(string memory _username, string memory _speciality, string memory _medicalLicenseNumber, string memory _description) public {
        Therapist memory newTherapist;
        newTherapist.username = _username;
        newTherapist.speciality = _speciality;
        newTherapist.medicalLicenseNumber = _medicalLicenseNumber;
        newTherapist.description = _description;

        therapists[msg.sender] = newTherapist;
    }

   // Function to create a new group
    function createGroup(
        string memory _title,
        Tag _tag,
        string memory _day,
        string memory _time,
        uint256 _duration,
        string memory _groupDescription,
        address _therapistAddress,
        address _moderatorAddress
    ) public returns (uint256) { // Specifying the return type
        uint256 groupId = nextGroupId++;

        Group memory newGroup;
        newGroup.groupId = groupId; // Assigning the groupId
        newGroup.title = _title;
        newGroup.tag = _tag;
        newGroup.day = _day;
        newGroup.time = _time;
        newGroup.duration = _duration;
        newGroup.groupDescription = _groupDescription;
        newGroup.therapistAddress = _therapistAddress;
        newGroup.timeCreated = block.timestamp;
        newGroup.moderatorAddress = _moderatorAddress;

        groupIdToGroup[groupId] = newGroup;
        tagToGroups[_tag].push(newGroup);

        return groupId; // Return the newly created groupId
    }

    // Function to retrieve a group given its groupId
    function getGroupById(uint256 _groupId) public view returns (
        uint256 groupId,
        string memory title,
        Tag tag,
        uint256 numberOfPeers,
        string memory day,
        string memory time,
        uint256 duration,
        string memory groupDescription,
        address therapistAddress,
        uint256 timeCreated,
        address moderatorAddress
    ) {
        Group storage group = groupIdToGroup[_groupId];
        return (
            group.groupId,
            group.title,
            group.tag,
            group.numberOfPeers,
            group.day,
            group.time,
            group.duration,
            group.groupDescription,
            group.therapistAddress,
            group.timeCreated,
            group.moderatorAddress
        );
    }

    // Function to add a user to a specific group
    function addUserToGroup(address userAddress, uint256 groupId) public {
        generalUsers[userAddress].groupMembership[groupId] = true;
        // Increment the numberOfPeers in the group by 1
        groupIdToGroup[groupId].numberOfPeers++;
    }

    // Function to check if a user is part of a specific group
    function isUserPartOfGroup(address userAddress, uint256 groupId) public view returns(bool) {
        return generalUsers[userAddress].groupMembership[groupId];
    }

    // Retrieval functions
    function getGeneralUserUsername(address userAddress) public view returns (string memory username) {
        return generalUsers[userAddress].username;
    }

    function getModerator(address modAddress) public view returns (string memory username, string memory description, uint256 createdTime) {
        Moderator memory mod = moderators[modAddress];
        return (mod.username, mod.description, mod.createdTime);
    }

    function getTherapist(address therapistAddress) public view returns (string memory username, string memory speciality, string memory medicalLicenseNumber, string memory description) {
        Therapist memory therapist = therapists[therapistAddress];
        return (therapist.username, therapist.speciality, therapist.medicalLicenseNumber, therapist.description);
    }

    // Function to get groups by a specific tag
    function getGroupsByTag(Tag tag) public view returns (Group[] memory) {
        return tagToGroups[tag];
    }

    // Function to get the count of groups associated with a specific tag
    function getGroupCountByTag(Tag tag) public view returns (uint256) {
        return tagToGroups[tag].length;
    }
}
