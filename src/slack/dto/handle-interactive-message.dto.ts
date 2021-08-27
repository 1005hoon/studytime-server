interface SlackMessageActions {
  name: string;
  type: string;
  value: any;
}
interface SlackMessageUser {
  id: string;
  name: string;
}

interface SlackMessageChannel {
  id: string;
  name: string;
}

interface SlackMessageOriginalMessage {
  ts: string;
}

export class HandleInteractiveMessageDto {
  actions: SlackMessageActions[];
  user: SlackMessageUser;
  channel: SlackMessageChannel;
  original_message: {
    ts: SlackMessageOriginalMessage;
  };
  attachments: any[];
}
