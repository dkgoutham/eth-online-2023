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
        address[20] members;  // Array to store addresses of users in the group
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
    // Dynamic array to store therapist addresses
    address[] private therapistAddresses;

    // Mapping to store the list of group IDs associated with each therapist's address.
    mapping(address => uint256[]) private therapistToGroupIds;

    // Function to check if a user (msg.sender) is already registered
    function isUserRegistered(address userAddress) public view returns(bool) {
        return bytes(generalUsers[userAddress].username).length != 0;
    }

    // Function to add a new general user
    function addGeneralUser(string memory _username) public payable{
        require(!isUserRegistered(msg.sender), "User is already registered.");
        require(msg.value >= 0.01 ether, "A minimum of 0.01 ether is required to register.");

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

        // Add therapist's address to the therapistAddresses array
        therapistAddresses.push(msg.sender);
    }

   // Function to create a new group
    function createGroup(
        string memory _title,
        Tag _tag,
        string memory _day,
        string memory _time,
        uint256 _duration,
        string memory _groupDescription
    ) public returns (uint256) {
        require(therapistAddresses.length > 0, "No therapists available.");

        // Select a random therapist address
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty))) % therapistAddresses.length;
        address selectedTherapistAddress = therapistAddresses[randomIndex];

        uint256 groupId = nextGroupId++;

        Group memory newGroup;
        newGroup.groupId = groupId;
        newGroup.title = _title;
        newGroup.tag = _tag;
        newGroup.day = _day;
        newGroup.time = _time;
        newGroup.duration = _duration;
        newGroup.groupDescription = _groupDescription;
        newGroup.therapistAddress = selectedTherapistAddress;  // Set the random therapist address here
        newGroup.timeCreated = block.timestamp;
        newGroup.moderatorAddress = msg.sender;  // Set the moderator's address (transaction sender)

        groupIdToGroup[groupId] = newGroup;
        tagToGroups[_tag].push(newGroup);

        therapistToGroupIds[selectedTherapistAddress].push(groupId);

        return groupId;
    }


    // Function to add a user to a specific group
    function addUserToGroup(address userAddress, uint256 groupId) public {
        // Check if the number of peers in the group is less than 20
        require(groupIdToGroup[groupId].numberOfPeers < 20, "Group has reached maximum capacity.");

        // Check if the user is not already a part of the group
        require(!isUserPartOfGroup(userAddress, groupId), "User is already part of the group.");

        generalUsers[userAddress].groupMembership[groupId] = true;

        // Add the user's address to the group's members array
        groupIdToGroup[groupId].members[groupIdToGroup[groupId].numberOfPeers] = msg.sender;

        // Increment the numberOfPeers in the group by 1
        groupIdToGroup[groupId].numberOfPeers++;
    }

    // Function to check if a user is part of a specific group
    function isUserPartOfGroup(address userAddress, uint256 groupId) public view returns(bool) {
        return generalUsers[userAddress].groupMembership[groupId];
    }

    //Returns the list of group IDs that the specified user is a member of.
    function getGroupMembershipOfUser(address userAddress) public view returns (uint256[] memory) {
        // Count the number of groups the user is a member of
        uint256 count = 0;
        for (uint256 i = 0; i < nextGroupId; i++) {
            if (generalUsers[userAddress].groupMembership[i]) {
                count++;
            }
        }
        // Initialize an array to store group IDs
        uint256[] memory memberGroups = new uint256[](count);
        // Populate the array with the group IDs the user is a member of
        uint256 index = 0;
        for (uint256 i = 0; i < nextGroupId; i++) {
            if (generalUsers[userAddress].groupMembership[i]) {
                memberGroups[index] = i;
                index++;
            }
        }
        return memberGroups;
    }

    //Retrieves the list of group IDs that a specified therapist is associated with.
    function getGroupsOfTherapist(address therapistAddress) public view returns (uint256[] memory) {
        return therapistToGroupIds[therapistAddress];
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

    // function to get the addresses of members in a specific group
    function getGroupMembers(uint256 groupId) public view returns (address[20] memory) {
        return groupIdToGroup[groupId].members;
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