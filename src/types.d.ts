export type NameValue = { name: string, value: string };
export type Color = { yellow: string, cyan: string, purple: string };
export type CommandAndAlias = {
    commands: Collection<string, Command>,
    aliases: Collection<string, Command>
};
export type CreateChannelData = {
    message: Message,
    name: string,
    parent: CategoryChannelResolvable,
    type: number
}