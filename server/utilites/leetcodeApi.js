import dotenv from "dotenv";
import path from "path";

dotenv.config({path:path.resolve(process.cwd(),"../../.env")});

async function fetchLeetCodeGraphQL(query, variables, sessionCookie = "") {
    const endpoint = 'https://leetcode.com/graphql';
    
    const headers = {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com/', // Required to bypass basic bot-protection
        'User-Agent': 'Mozilla/5.0 (Node.js)',
    };

    // need session cookie when fetching the code data
    if (sessionCookie) {
        headers['Cookie'] = `LEETCODE_SESSION=${sessionCookie};`;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ query, variables })
        });

        const json = await response.json();
        if (json.errors) throw new Error(json.errors[0].message);
        
        return json.data;
    } catch (error) {
        console.error("GraphQL Request Failed:", error);
    }
};



const getRecentAccepted = async (username) => {
    //graphQL syntax for leetcode
    const query = `
        query recentAcSubmissions($username: String!, $limit: Int!) {
            recentAcSubmissionList(username: $username, limit: $limit) {
                id
                title
                titleSlug
                timestamp
            }
        }
    `;

    const variables = {
        username: username,
        limit: 5 
    };

    const data = await fetchLeetCodeGraphQL(query, variables);
    return data.recentAcSubmissionList;
};


const getRecentSubmissionCode=async (submissionId,sessionCookie)=>{
    const query = `
                query submissionDetails($submissionId: Int!) {
            submissionDetails(submissionId: $submissionId) {
                code
                timestamp
                lang {
                    name
                    verboseName
                }
                question {
                    questionId
                    title
                    difficulty
                }
            }
        }
    `;

    const variables={
        submissionId: parseInt(submissionId) 
    };
    try{
        const data=await fetchLeetCodeGraphQL(query, variables, sessionCookie);
        return data;
    }catch(error){
        console.error("An error Occured:",error);
    }

};

const sessionCookie=process.env.LEETCODE_SESSION_COOKIE;
const submissions=await getRecentAccepted(process.env.LEETCODE_USERNAME);
const data=await getRecentSubmissionCode(submissions[0].id,sessionCookie);

console.log(data.submissionDetails.question.title);

export const code=data.submissionDetails.code;
export const lang=data.submissionDetails.lang.name;
export const question=data.submissionDetails.question.title;

console.log(code);