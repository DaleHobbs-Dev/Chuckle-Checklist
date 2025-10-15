export const postNewJoke = async (joke) => {
    try {
        const response = await fetch('http://localhost:8088/jokes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: joke,
                told: false
            })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Joke added:', data);
        return data;
    } catch (error) {
        console.error('Failed to add joke:', error);
    }
}