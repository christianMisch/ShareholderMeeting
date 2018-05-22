pragma solidity ^0.4.23;

contract Meeting {

    uint meetingId;
    string meetingDate;
    uint meetingStartTime;
    uint public meetingEndTime;
    bool isMeetingFinished;

    constructor (uint _meetingId, string _meetingDate, uint _meetingStartTime,
            uint _meetingEndTime, bool _isMeetingFinished) public {
        meetingId = _meetingId;
        meetingDate = _meetingDate;
        meetingStartTime = _meetingStartTime;
        meetingEndTime = _meetingEndTime;
        isMeetingFinished = _isMeetingFinished;
    }
}