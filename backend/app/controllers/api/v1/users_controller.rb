class Api::V1::UsersController < ApplicationController
    def index
        users = User.all
        render json: users, except: [:created_at, :updated_at]
    end

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user, except: [:created_at, :updated_at]
        else 
            render json: {message: 'User not found'}
        end
    end

    def create
        user = User.create(user_params)
        render json: user
    end

    private
    def user_params
        params.require(:user).permit(:username,:email,:password,:role,:firstname,:lastname)
    end
end
