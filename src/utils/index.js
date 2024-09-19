const functions = {
    generateUniqueId: (existingIds) => {
        const generateId = () => Math.floor(Math.random() * 1e8).toString(36); // Generates a random ID in base36 (alphanumeric)

        let newId = generateId();

        while (existingIds.includes(newId)) {
            newId = generateId();
        }

        return newId;
    },

    buildHierarchy: (subjects, topics, factors, boardId) => {
        if(!boardId){
            return [];
        }
        // Step 1: Filter subjects based on boardId
        const subjectsToSelect = subjects.filter(({ boardid }) => boardid === boardId);

        // Step 2: Build a mapping of topics by subjectId
        const topicsBySubjectId = subjectsToSelect.reduce((acc, { id: subjectId }) => {
            const filteredTopics = topics.filter(({ subjectid, boardid }) => boardId === boardid && subjectid === subjectId);
            acc[subjectId] = filteredTopics;
            return acc;
        }, {});

        // Step 3: Build a mapping of factors by topicId
        const factorsByTopicId = factors.reduce((acc, factor) => {
            const { subjectid, boardid, topicid } = factor;
            if (boardid === boardId) {
                if (!acc[topicid]) {
                    acc[topicid] = [];
                }
                acc[topicid].push(factor);
            }
            return acc;
        }, {});

        // Step 4: Construct the hierarchy using `map`
        const result = subjectsToSelect.map(({ id: subjectId, name: subjectName }) => {
            const topics = topicsBySubjectId[subjectId] || [];

            // For each topic, get the associated factors
            const topicHierarchy = topics.map(({ id: topicId, name: topicName }) => {
                const factorsForTopic = factorsByTopicId[topicId] || [];
                return {
                    name: topicName,
                    id: topicId,
                    factors: factorsForTopic
                };
            });

            return {
                name: subjectName,
                id: subjectId,
                topics: topicHierarchy
            };
        });

        return result;
    }




}
export default functions