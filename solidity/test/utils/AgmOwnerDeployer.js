const defaultData = {
    /*minimumVotingQuorum: 3,
    marginOfVotesForMajority: 50,
    meetingName: 'Siemens AGM 2018',
    meetingDescription: 'Annual General Meeting 2018',
    meetingDate: '01.01.2018',
    meetingPlace: 'ICC Berlin',
    meetingStartTime: 0,
    meetingEndTime: 240*/
  }
  
  module.exports = (AgmOwner) => {
    return async (ownerAdr, factory) => {
        const data = Object.assign({}, defaultData);
        data.owner = ownerAdr;
        data.fac = factory;
        
        return AgmOwner.new(
          /*data.minimumVotingQuorum, 
          data.marginOfVotesForMajority, 
          data.meetingName, 
          data.meetingDescription, 
          data.meetingDate, 
          data.meetingPlace, 
          data.meetingStartTime, 
          data.meetingEndTime,*/
          data.owner,
          data.fac
      );
    }
      
  }