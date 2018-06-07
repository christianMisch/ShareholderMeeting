pragma solidity ^0.4.23;

contract Meeting {

    uint meetingId;
    string meetingName;
    string meetingDescription;
    string public meetingDate;
    string public meetingPlace;
    uint meetingStartTime;
    uint meetingEndTime;
    bool public isMeetingFinished;

    constructor(
        uint _meetingId, 
        string _meetingName, 
        string _meetingDescription,
        string _meetingDate,
        string _meetingPlace,
        uint _meetingStartTime,
        uint _meetingEndTime,
        bool _isMeetingFinished) public {

        meetingId = _meetingId;
        meetingName = _meetingName;
        meetingDescription = _meetingDescription;
        meetingDate = _meetingDate;
        meetingPlace = _meetingPlace;
        meetingStartTime = _meetingStartTime;
        meetingEndTime = _meetingEndTime;
        isMeetingFinished = _isMeetingFinished;

    }
}