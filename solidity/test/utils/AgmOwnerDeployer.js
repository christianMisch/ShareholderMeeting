const defaultData = {
    minimumVotingQuorum: 3,
    marginOfVotesForMajority: 50,
    meetingName: 'Siemens AGM 2018',
    meetingDescription: 'Annual General Meeting 2018',
    meetingDate: '01.01.2018',
    meetingPlace: 'ICC Berlin',
    meetingStartTime: 0,
    meetingEndTime: 240
  }
  
  module.exports = (AgmOwner) => {
    return (ownerAdr) => {
        const data = Object.assign({}, defaultData);
        data.owner = ownerAdr;
        
        return AgmOwner.new(
          data.minimumVotingQuorum, 
          data.marginOfVotesForMajority, 
          data.meetingName, 
          data.meetingDescription, 
          data.meetingDate, 
          data.meetingPlace, 
          data.meetingStartTime, 
          data.meetingEndTime
      );
    }
      
  }