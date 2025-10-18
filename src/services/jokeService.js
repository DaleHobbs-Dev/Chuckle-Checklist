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

export const deleteJoke = async (joke) => {
    const { id } = joke;

    try {
        const response = await fetch(`http://localhost:8088/jokes/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        console.log(`Joke with ID ${id} deleted.`);
    } catch (error) {
        console.error('Failed to delete joke:', error);
    }
}

export const fetchAllJokes = async () => {
    try {
        const response = await fetch('http://localhost:8088/jokes');
        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch jokes:', error);
        return [];
    }
}

export const changeToldStatus = async (joke) => {
    const { id, told } = joke;

    try {
        const response = await fetch(`http://localhost:8088/jokes/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ told: !told })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Joke status updated:', data);
        return data;
    } catch (error) {
        console.error('Failed to update joke status:', error);
    }
}
