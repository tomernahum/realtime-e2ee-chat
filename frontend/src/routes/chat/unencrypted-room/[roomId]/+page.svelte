<!-- Not working for fetching idk why -->

<script>
	import { page } from "$app/stores";
	import EncryptedChat from "$lib/chat/EncryptedChat.svelte";
    import RoomPage from "$lib/chat/RoomPage.svelte";
	import { FakeEncryptionHelper } from "$lib/fake_encryption";
    // import UnencryptedChat from "$lib/chat/UnencryptedChat.svelte";

    const roomId = $page.params.roomId
    
</script>

{#await FakeEncryptionHelper.getObj("fake-key")}
    <p>loading</p>
{:then fakeEncryption} 

    <EncryptedChat encryption={fakeEncryption} {roomId}/>
{/await}
