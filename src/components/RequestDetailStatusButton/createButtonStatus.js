export const createButtonStatus = (request, user) => {
  const updateStatus = async (request, user, statusId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_HOST}/requests/statuses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestId: request.id,
            userId: user.userId,
            statusId: statusId,
          }),
        }
      );
      console.log(res);
      const resJson = await res.json();
      console.log(resJson);
    } catch (err) {
      console.log(err);
    }
  };

  const isDisplay = true;
  const text = "まかせて！";
  const onClick = async () => {
    await updateStatus(request, user, 2);
  };

  return { isDisplay, text, onClick };
};
