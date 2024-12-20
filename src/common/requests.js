export const updateRequest = async (
  request,
  updateRequestList,
  statusId,
  responderId,
  isCancel
) => {
  try {
    const requests = await fetch(
      `${import.meta.env.VITE_API_HOST}/requests/statuses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: request.id,
          statusId: statusId,
          userId: responderId,
          isCancel: isCancel,
        }),
      }
    ).then((res) => res.json());
    const newRequest = {
      ...request,
      statusId: requests[0].status_id,
      requestStatusHistoryId: requests[0].rerequest_history_id,
      createdAt: requests[0].created_at,
      responderId: isCancel ? null : responderId,
    };
    if ([1, 2, 3].includes(statusId)) {
      updateRequestList(request.id, newRequest, false);
    } else {
      updateRequestList(request.id, newRequest, true);
    }
  } catch (e) {
    console.log(e);
  }
};
