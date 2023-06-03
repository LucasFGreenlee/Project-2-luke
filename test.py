from steam import Steam
from decouple import config

KEY = config("STEAM_API_KEY")

steam = Steam(KEY)

# arguments: steamid

    #user details
user = steam.users.get_user_details("76561198171430935")
print(user)

    #friends list
user = steam.users.get_user_friends_list("76561198171430935")
print(user)

    #recently played games
user = steam.users.get_user_recently_played_games("76561198171430935")
print(user)

    #owned games
user = steam.users.get_owned_games("76561198171430935")
print(user)

    #steam level
user = steam.users.get_user_steam_level("76561198171430935")
print(user)

    #search games
user = steam.apps.search_games("dota")
print(user)

    #get game details
# user = steam.apps.get_app_details(dota_app_id)
# print(user)

    #get user app stats
# user = steam.apps.get_user_stats("<steam_id>", "<app_id>")
# print(user)

    #get user achievements
# user = steam.apps.get_user_achievements("<steam_id>", "<app_id>")
# print(user)