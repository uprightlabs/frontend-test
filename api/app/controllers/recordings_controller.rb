class RecordingsController < ApplicationController
  before_action :find_recording, only: [:show, :update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :render_404
  rescue_from ActionController::ParameterMissing, with: :render_err

  def index
    render json: Recording.all
  end

  def show
    render json: @recording
  end

  def create
    @recording = Recording.new(recording_params)
    if @recording.save
      render json: @recording
    else
      render json: {errors: @recording.errors}, status: 422
    end

  end

  def update
    if @recording.update(recording_params)
      render json: @recording
    else
      render json: {errors: @recording.errors}, status: 422
    end
  end

  def destroy
    if @recording.destroy
      render json: {}
    else
      render json: {message: 'unable to delete recording'}, status: 422
    end
  end

  private
  def render_err(e)
    render json: {message: e}, status: 422
  end

  def render_404
    render json: {message: 'not found'}, status: 404
  end

  def recording_params
    params.require(:recording).permit(:name, :body)
  end

  def find_recording
    @recording = Recording.find(params[:id] || params[:recording_id])
  end

end
