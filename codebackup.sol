/*for (uint k = 0; k < options.length; k++) {
            uint id = optionCount[proposalId].length++;
            optionCount[proposalId][id] = VotingOption({optionName: options[k], optionCount: 0});

            // iterate over all votes to check which voter voted for option k
            for (uint i = 0; i < prop.votes.length; i++) {
                
                Vote storage v = prop.votes[i];
                if (keccak256(v.voterDecision) == keccak256(options[k])) {
                    optionCount[proposalId][k].optionCount++; 
                } 
            }
        }*/ 