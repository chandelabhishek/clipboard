### Refactoring:
 
#### Points taken into consideration while refactoring:

1. There were a lot of nested if-else condition which makes code hard to read and reason about. These are replaced by guards now(return as soon it can, so that the function flow ends there).
2. Mutations: candidate variable was being mutated a lot of times. candidate variable is removed altogether. No mutation is happening now.
3. create hash digest was being used twice so extracted that piece out in a function, makes it reusable and more readable.


### Ticket Breakdown

1. Create a table to keep mapping of custom-ids and internal-ids.
    
    implementaion details:
         
         create table masked_agents {
            id uuid,
            agent_id uuid,
            masked_agent_id uuid,
            create_at timestamp,
            updated_at timestamp,
            deleted_at timestamp,
            created_by uuid,
            updated_by uuid
         }

        partial unique index on (agent_id, masked_agent_id) where deleted_at is null;

        this table has to be created in order to mask internal_ids.

2. Expose API to assign custom ids to agents.
    implementation details:

        This API should accept agent_id and new custom id and save it in the above table.

3. Replace internal_ids in getShiftsByFacility call;

        All the occurance of internal db-ids should be replaced by custom - ids created by exposed API.