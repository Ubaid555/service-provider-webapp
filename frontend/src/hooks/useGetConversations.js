import { useEffect, useState } from "react";
// import toast from "react-hot-toast";


const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
        const userId = JSON.parse(localStorage.getItem("loginusers"))._id;
        console.log(userId)
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch(`http://localhost:5001/api/users/getUsers?userId=${userId}`);
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
                alert(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;