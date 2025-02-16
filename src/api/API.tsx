const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;

    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const users = await response.json();

    const fullProfiles = await Promise.all(
      users.map(async (user: { login: string }) => {
        const userData = await searchGithubUser(user.login);
        return userData ? userData : user;
      })
    );

    return fullProfiles;
  } catch (err) {
    console.error('An error occurred while fetching GitHub users:', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`GitHub API error: ${data.message}`);
    }

    return data;
  } catch (err) {
    console.error(`Error fetching user data for ${username}:`, err);
    return null; 
  }
};

export { searchGithub, searchGithubUser };
