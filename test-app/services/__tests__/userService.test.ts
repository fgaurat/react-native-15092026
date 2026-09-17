import { fetchUser, User } from "../userService";



const alice: User = { id: 1, name: 'Alice', email: 'alice@example.com' };


function mockResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}


describe('userService',()=>{


  let fetchSpy: jest.SpyInstance

  beforeEach(()=>{
    fetchSpy = jest.spyOn(globalThis,"fetch")
  })

  afterEach(()=>{
    jest.resetAllMocks()
  })

    describe('fetchUser',()=>{
      it('return user 1 Alice',async ()=>{

        fetchSpy.mockResolvedValue(mockResponse(alice))

        const user = await fetchUser(1)
        expect(user).toEqual(alice)

      })
    })



})